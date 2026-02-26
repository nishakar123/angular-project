import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-parking-lot',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './parking-lot.html',
  styleUrl: './parking-lot.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ParkingLot implements OnInit {

  private baseUrl = 'http://localhost:8082/api/vehicle-parking-service';

  parkingLots: any[] = [];

  constructor(private apiService: ApiService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getParkingLotData();
  }

  getParkingLotData() {
    this.apiService.get<any[]>(`${this.baseUrl}/parking-lot/find-all`).subscribe({
      next: (data) => {
        this.parkingLots = data;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => console.error('Error fetching parking lot data', err),
    });
}
}
