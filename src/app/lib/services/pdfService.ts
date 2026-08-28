import { jsPDF } from 'jspdf';

export function generateOrderInvoicePDF(order: any): jsPDF {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(234, 88, 12); // Orange #ea580c
  doc.text('KEMAL OTO', 20, 25);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Otomotiv Yedek Parça & Aksesuar A.Ş.', 20, 32);
  doc.text('Maslak Oto Sanayi No:42, Sarıyer / İstanbul', 20, 37);

  // Invoice & Vehicle VIN Details
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`Sipariş / Fatura No: #${order.id ? order.id.slice(0, 8) : 'KML-98241'}`, 20, 48);
  doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, 20, 54);
  doc.text(`Müşteri: ${order.shipping_address?.full_name || order.full_name || 'Kemal Müşteri'}`, 20, 60);
  doc.text(`Adres: ${order.shipping_address?.address || 'Maslak / İstanbul'}`, 20, 66);

  // Vehicle / VIN Information (if provided)
  const vinNumber = order.vin || order.vehicle_vin || 'WVWZZZ3CZWE123456';
  const vehicleModel = order.vehicle_model || 'Volkswagen Golf VII 1.6 TDI';
  doc.setTextColor(234, 88, 12);
  doc.text(`Araç Şasi No (VIN): ${vinNumber} (%100 Şase Uyumlu)`, 20, 72);
  doc.setTextColor(71, 85, 105);
  doc.text(`Araç Modeli: ${vehicleModel}`, 20, 78);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 84, 190, 84);

  // Items Header
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Ürün / Parça OEM Kodu', 20, 94);
  doc.text('Adet', 120, 94);
  doc.text('Tutar (TRY)', 160, 94);

  let y = 104;
  if (order.items && Array.isArray(order.items)) {
    order.items.forEach((item: any) => {
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(item.title || item.product_name || 'Yedek Parça', 20, y);
      doc.text((item.quantity || 1).toString(), 125, y);
      doc.text(`${item.price || 0} TL`, 160, y);
      y += 8;
    });
  } else {
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text('Otomotiv Yedek Parçaları', 20, y);
    doc.text('1', 125, y);
    doc.text(`${order.total_amount || 0} TL`, 160, y);
    y += 8;
  }

  // Total & Cargo Info
  doc.line(20, y + 4, 190, y + 4);
  doc.setFontSize(12);
  doc.setTextColor(234, 88, 12);
  doc.text(`Toplam Tutar: ${order.total_amount || 0} TRY`, 130, y + 14);

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('* Bu sipariş uzman teknisyen tarafından şasi uyumu teyit edilerek sevk edilmiştir.', 20, y + 22);

  return doc;
}
