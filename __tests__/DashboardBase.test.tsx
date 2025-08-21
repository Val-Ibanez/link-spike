/**
 * @format
 * DashboardBase Component Tests
 */

import React from 'react';
import fs from 'fs';
import path from 'path';

describe('DashboardBase Component', () => {
  const filePath = path.join(__dirname, '../src/main/screens/Dashboard/components/DashboardBase.tsx');

  test('file exists', () => {
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('file is readable', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(0);
  });

  test('file contains React component', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('export default function DashboardBase');
    expect(content).toContain('React.JSX.Element');
  });

  test('file contains expected props interface', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('onNavigateToPayments');
    expect(content).toContain('onNavigateToTransactions');
    expect(content).toContain('onNavigateToSettings');
    expect(content).toContain('onNavigateToQR');
  });

  test('file contains expected UI elements', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('Hola, Comercio!');
    expect(content).toContain('Acciones Rápidas');
    expect(content).toContain('Generar QR');
    expect(content).toContain('Promociones');
  });

  test('file has proper TypeScript syntax', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('interface DashboardBaseProps');
    expect(content).toContain(': React.JSX.Element');
  });
});
