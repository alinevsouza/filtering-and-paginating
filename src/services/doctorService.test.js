// src/services/doctorService.test.js
import { describe, it, expect, vi } from 'vitest';
import doctorService from './doctorService';

const mockDoctors = [
  { id: 1, nome: 'Dr. John Doe', especialidade: 'Cardiologia', crm: '12345' },
  { id: 2, nome: 'Dr. Jane Smith', especialidade: 'Dermatologia', crm: '67890' },
  { id: 3, nome: 'Dr. Alice Johnson', especialidade: 'Cardiologia', crm: '10111' },
  { id: 4, nome: 'Dr. Bob Williams', especialidade: 'Pediatria', crm: '22233' },
  { id: 5, nome: 'Dr. Carol Davis', especialidade: 'Neurologia', crm: '44455' },
  { id: 6, nome: 'Dr. Eve Moore', especialidade: 'Oftalmologia', crm: '66677' },
  { id: 7, nome: 'Dr. Frank Taylor', especialidade: 'Endocrinologia', crm: '88899' },
  { id: 8, nome: 'Dr. Grace Wilson', especialidade: 'Ginecologia', crm: '99900' },
  { id: 9, nome: 'Dr. Harry Brown', especialidade: 'Urologia', crm: '11122' },
  { id: 10, nome: 'Dr. Ivy Miller', especialidade: 'Oncologia', crm: '33344' },
  { id: 11, nome: 'Dr. Jack Anderson', especialidade: 'Pneumologia', crm: '55566' },
];

describe('doctorService', () => {
  describe('getPaginatedDoctors', () => {
    it('should return the first page of doctors', () => {
      const paginated = doctorService.getPaginatedDoctors(mockDoctors, 1, 5);
      expect(paginated.doctors.length).toBe(5);
      expect(paginated.doctors[0].nome).toBe('Dr. John Doe');
      expect(paginated.doctors[4].nome).toBe('Dr. Carol Davis');
      expect(paginated.total).toBe(mockDoctors.length);
      expect(paginated.totalPages).toBe(3);
      expect(paginated.currentPage).toBe(1);
    });

    it('should return the second page of doctors', () => {
      const paginated = doctorService.getPaginatedDoctors(mockDoctors, 2, 5);
      expect(paginated.doctors.length).toBe(5);
      expect(paginated.doctors[0].nome).toBe('Dr. Eve Moore');
      expect(paginated.doctors[4].nome).toBe('Dr. Ivy Miller');
      expect(paginated.total).toBe(mockDoctors.length);
      expect(paginated.totalPages).toBe(3);
      expect(paginated.currentPage).toBe(2);
    });

    it('should return the last page of doctors', () => {
      const paginated = doctorService.getPaginatedDoctors(mockDoctors, 3, 5);
      expect(paginated.doctors.length).toBe(1);
      expect(paginated.doctors[0].nome).toBe('Dr. Jack Anderson');
      expect(paginated.total).toBe(mockDoctors.length);
      expect(paginated.totalPages).toBe(3);
      expect(paginated.currentPage).toBe(3);
    });

    it('should handle page size larger than the number of doctors', () => {
      const paginated = doctorService.getPaginatedDoctors(mockDoctors, 1, 20);
      expect(paginated.doctors.length).toBe(11);
      expect(paginated.total).toBe(mockDoctors.length);
      expect(paginated.totalPages).toBe(1);
      expect(paginated.currentPage).toBe(1);
    });

    it('should handle an empty list of doctors', () => {
      const paginated = doctorService.getPaginatedDoctors([], 1, 5);
      expect(paginated.doctors.length).toBe(0);
      expect(paginated.total).toBe(0);
      expect(paginated.totalPages).toBe(0);
      expect(paginated.currentPage).toBe(1);
    });
  });
});