import { NextRequest, NextResponse } from 'next/server';
import { getDHLLabelData } from '@/app/lib/shipping/dhlService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params;
    const labelData = await getDHLLabelData(trackingNumber);

    // DHL Kargo Konşimentosu ve Barkod Etiketi HTML Çıktısı
    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DHL Express Kargo Konşimentosu - ${labelData.trackingNumber}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    body {
      background-color: #f1f5f9;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 12px;
      color: #0f172a;
    }
    .print-actions {
      margin-bottom: 16px;
      display: flex;
      gap: 12px;
    }
    .btn {
      background-color: #d40511;
      color: #ffffff;
      border: none;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .btn:hover {
      background-color: #b0040e;
    }
    .btn-secondary {
      background-color: #334155;
    }
    .btn-secondary:hover {
      background-color: #1e293b;
    }
    .label-container {
      width: 100%;
      max-width: 580px;
      background: #ffffff;
      border: 2px solid #000000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    .dhl-header {
      background-color: #ffcc00;
      border-bottom: 3px solid #d40511;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dhl-logo {
      font-size: 32px;
      font-weight: 900;
      font-style: italic;
      color: #d40511;
      letter-spacing: -1px;
    }
    .dhl-service-badge {
      background-color: #d40511;
      color: #ffffff;
      font-size: 12px;
      font-weight: 900;
      padding: 4px 10px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .section {
      border-bottom: 2px solid #000000;
      padding: 10px 14px;
    }
    .routing-banner {
      background: #000000;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 14px;
      font-size: 18px;
      font-weight: 900;
    }
    .routing-banner span {
      color: #ffcc00;
    }
    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-bottom: 2px solid #000000;
    }
    .col {
      padding: 10px 14px;
    }
    .col:first-child {
      border-right: 2px solid #000000;
    }
    .section-title {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 4px;
    }
    .party-name {
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 2px;
    }
    .party-desc {
      font-size: 11px;
      color: #334155;
      line-height: 1.35;
    }
    .barcode-section {
      text-align: center;
      padding: 16px 14px;
      background: #ffffff;
      border-bottom: 2px solid #000000;
    }
    .barcode-svg {
      width: 85%;
      height: 70px;
      margin: 0 auto;
    }
    .tracking-code-display {
      font-size: 16px;
      font-weight: 900;
      letter-spacing: 3px;
      margin-top: 6px;
      font-family: monospace;
    }
    .package-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      text-align: center;
      background: #f8fafc;
      border-bottom: 2px solid #000000;
    }
    .grid-cell {
      padding: 8px;
      border-right: 1px solid #cbd5e1;
    }
    .grid-cell:last-child {
      border-right: none;
    }
    .grid-label {
      font-size: 9px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
    }
    .grid-value {
      font-size: 13px;
      font-weight: 900;
      color: #0f172a;
      margin-top: 2px;
    }
    .footer-section {
      padding: 8px 14px;
      background-color: #ffcc00;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      font-weight: 700;
    }
    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .print-actions {
        display: none;
      }
      .label-container {
        box-shadow: none;
        max-width: 100%;
        width: 100%;
      }
    }
  </style>
</head>
<body>

  <div class="print-actions">
    <button class="btn" onclick="window.print()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <path d="M6 14h12v8H6z"/>
      </svg>
      Konşimentoyu Yazdır (Print)
    </button>
    <button class="btn btn-secondary" onclick="window.close()">Kapat</button>
  </div>

  <div class="label-container">
    
    <!-- DHL Express Header -->
    <div class="dhl-header">
      <div class="dhl-logo">DHL</div>
      <div class="dhl-service-badge">EXPRESS DOMESTIC</div>
    </div>

    <!-- Routing Banner -->
    <div class="routing-banner">
      <div>ROUTING: <span>${labelData.routingCode}</span></div>
      <div>TR-DOM</div>
    </div>

    <!-- Shipper & Consignee 2-Columns -->
    <div class="two-cols">
      <!-- Shipper -->
      <div class="col">
        <div class="section-title">GÖNDERİCİ (FROM / SHIPPER)</div>
        <div class="party-name">${labelData.shipper.company}</div>
        <div class="party-desc">
          ${labelData.shipper.address}<br>
          <strong>${labelData.shipper.city}</strong><br>
          Tel: ${labelData.shipper.phone}
        </div>
      </div>

      <!-- Consignee -->
      <div class="col">
        <div class="section-title">ALICI (TO / CONSIGNEE)</div>
        <div class="party-name">${labelData.consignee.name}</div>
        <div class="party-desc">
          ${labelData.consignee.address}<br>
          <strong>${labelData.consignee.district} / ${labelData.consignee.city}</strong><br>
          Tel: ${labelData.consignee.phone}
        </div>
      </div>
    </div>

    <!-- Package Grid Details -->
    <div class="package-grid">
      <div class="grid-cell">
        <div class="grid-label">Parça Sayısı</div>
        <div class="grid-value">${labelData.pieces} KOLİ</div>
      </div>
      <div class="grid-cell">
        <div class="grid-label">Ağırlık</div>
        <div class="grid-value">${labelData.weightKg} KG</div>
      </div>
      <div class="grid-cell">
        <div class="grid-label">Hacim (Desi)</div>
        <div class="grid-value">${labelData.desi} DESİ</div>
      </div>
      <div class="grid-cell">
        <div class="grid-label">Tarih</div>
        <div class="grid-value">${labelData.createdDate}</div>
      </div>
    </div>

    <!-- Barcode Section -->
    <div class="barcode-section">
      <div class="section-title">DHL WAYBILL / AWB TAKİP BARKODU</div>
      <!-- SVG Code 128 Simulated Barcode -->
      <svg class="barcode-svg" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="320" height="80" fill="#ffffff"/>
        <!-- Pattern of bars -->
        <rect x="15" y="5" width="4" height="65" fill="#000"/>
        <rect x="23" y="5" width="2" height="65" fill="#000"/>
        <rect x="29" y="5" width="6" height="65" fill="#000"/>
        <rect x="39" y="5" width="3" height="65" fill="#000"/>
        <rect x="46" y="5" width="5" height="65" fill="#000"/>
        <rect x="55" y="5" width="2" height="65" fill="#000"/>
        <rect x="61" y="5" width="7" height="65" fill="#000"/>
        <rect x="72" y="5" width="4" height="65" fill="#000"/>
        <rect x="80" y="5" width="2" height="65" fill="#000"/>
        <rect x="86" y="5" width="6" height="65" fill="#000"/>
        <rect x="96" y="5" width="3" height="65" fill="#000"/>
        <rect x="103" y="5" width="5" height="65" fill="#000"/>
        <rect x="112" y="5" width="2" height="65" fill="#000"/>
        <rect x="118" y="5" width="7" height="65" fill="#000"/>
        <rect x="129" y="5" width="4" height="65" fill="#000"/>
        <rect x="137" y="5" width="3" height="65" fill="#000"/>
        <rect x="144" y="5" width="6" height="65" fill="#000"/>
        <rect x="154" y="5" width="2" height="65" fill="#000"/>
        <rect x="160" y="5" width="5" height="65" fill="#000"/>
        <rect x="169" y="5" width="4" height="65" fill="#000"/>
        <rect x="177" y="5" width="2" height="65" fill="#000"/>
        <rect x="183" y="5" width="7" height="65" fill="#000"/>
        <rect x="194" y="5" width="3" height="65" fill="#000"/>
        <rect x="201" y="5" width="5" height="65" fill="#000"/>
        <rect x="210" y="5" width="2" height="65" fill="#000"/>
        <rect x="216" y="5" width="6" height="65" fill="#000"/>
        <rect x="226" y="5" width="4" height="65" fill="#000"/>
        <rect x="234" y="5" width="3" height="65" fill="#000"/>
        <rect x="241" y="5" width="6" height="65" fill="#000"/>
        <rect x="251" y="5" width="2" height="65" fill="#000"/>
        <rect x="257" y="5" width="5" height="65" fill="#000"/>
        <rect x="266" y="5" width="4" height="65" fill="#000"/>
        <rect x="274" y="5" width="2" height="65" fill="#000"/>
        <rect x="280" y="5" width="7" height="65" fill="#000"/>
        <rect x="291" y="5" width="3" height="65" fill="#000"/>
        <rect x="298" y="5" width="5" height="65" fill="#000"/>
      </svg>
      <div class="tracking-code-display">${labelData.trackingNumber}</div>
    </div>

    <!-- Contents Description -->
    <div class="section" style="background:#fcfcfc;">
      <div class="section-title">İÇERİK / AÇIKLAMA</div>
      <div style="font-size: 11px; font-weight: 600;">
        ${labelData.contentsDesc} (Sipariş No: ${labelData.orderId})
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-section">
      <div>DHL MÜŞTERİ HESAP NO: ${labelData.accountNumber}</div>
      <div>KEMAL OTO & DHL EXPRESS GÜVENCESİ</div>
    </div>

  </div>

</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error: any) {
    return new NextResponse('Kargo etiketi oluşturulamadı: ' + error?.message, {
      status: 500,
    });
  }
}
