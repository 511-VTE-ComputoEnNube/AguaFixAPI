import { CreateReportDto } from '../dto/create-report.dto';

export function generateReportTemplate(dto: CreateReportDto): string {
  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return '<span style="background-color: #e53e3e; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold;">ALTA</span>';
      case 'medium':
        return '<span style="background-color: #dd6b20; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold;">MEDIA</span>';
      case 'low':
      default:
        return '<span style="background-color: #3182ce; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold;">BAJA</span>';
    }
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #2b6cb0; color: #ffffff; padding: 16px; text-align: center;">
        <h2 style="margin: 0;">Aviso de Fuga de Agua Reportada</h2>
        <p style="margin: 4px 0 0 0; font-size: 14px;">Cuadrilla de Mantenimiento</p>
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; width: 35%;">Dirección / Referencia:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;">${dto.address}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Descripción:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;">${dto.description}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Severidad:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;">${getSeverityBadge(dto.severity)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Teléfono de Contacto:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;">${dto.reporterPhone}</td>
          </tr>
        </table>
      </div>
    </div>
  `;
}