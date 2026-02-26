import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Vehicle implements OnInit {

  private baseUrl = 'http://localhost:8082/api/vehicle-parking-service';

  parkingLotId: string | null = null;
  vehicles: any[] = [];

  showParkModal: boolean = false;

  parkVehicleForm = {
    name: '',
    plateNumber: '',
    vehicleType: 'CAR',
    engineType: 'PETROL',
    color: '',
    weight: '',
    description: '',
    parkingLotId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.parkingLotId = this.route.snapshot.paramMap.get('id');
    if (this.parkingLotId) {
      this.getVehicles();
    }
  }

  getVehicles() {
    this.apiService.get<{ vehicles: any[] }>(`${this.baseUrl}/parking-lot/find-by-id/${this.parkingLotId}`).subscribe({
      next: (data) => {
        this.vehicles = data.vehicles;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => console.error('Error fetching vehicles', err),
    });
  }

  deleteVehicle(vehicleId: string) {
    const isDeleted = confirm('Are you sure you want to delete this vehicle?');
    if (!isDeleted) {
      return;
    }
    this.apiService.delete(`${this.baseUrl}/delete/vehicle/${vehicleId}`).subscribe({
      next: () => {
        this.getVehicles(); // Refresh the list after deletion
        alert('Vehicle deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting vehicle', err)
        alert('Failed to delete vehicle');},
    });
  }

  saveVehicle(string: 'Save' | 'Update') {
    const payload = {
      ...this.parkVehicleForm,
      parkingLotId: this.parkingLotId
    };
    console.log('Payload for parking vehicle:', payload);
    this.apiService.post(`${this.baseUrl}/park/vehicle`, payload).subscribe({
      next: () => {
        if(string === 'Save') {
          alert('Vehicle parked successfully');
        }else{
          alert('Vehicle updated successfully');
        }
        this.closeParkModal();
        this.getVehicles(); // Refresh the list
      },
      error: (err) => {
        console.error('Error parking vehicle', err);
        alert('Failed to park vehicle');
      }
    });
  }

  editVehicle(vehicle: any) {
    console.log('Editing vehicle:', vehicle);
    console.log('Parking lot id:', this.parkingLotId);
    this.parkVehicleForm = {
      ...vehicle,
      parkingLotId: this.parkingLotId
    }; // Populate form with existing vehicle data and parking lot id
    console.log('Form data after patching:', this.parkVehicleForm);
    this.showParkModal = true;
  }

  parkVehicle() {
    this.resetForm();
    this.showParkModal = true;
  }

  closeParkModal() {
    this.showParkModal = false;
    this.resetForm();
  }

  resetForm() {
    this.parkVehicleForm = {
      name: '',
      plateNumber: '',
      vehicleType: 'CAR',
      engineType: 'PETROL',
      color: '',
      weight: '',
      description: '',
      parkingLotId: ''
    };
  }
}
