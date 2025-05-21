// Ejemplo de transaccion
// {
//   id: Date.now(),
//   type: "payment",
//   description: `Pago de servicio - ${formValues.service}`,
//   amount,
//   date: new Date().toISOString(),
// }

const generateReceipt = (transaction) => {
  const typeDictionary = {
    deposit: "Depósito",
    withdraw: "Retiro",
    transfer: "Transferencia",
    payment: "Pago de servicio",
  };

  const transactionType = typeDictionary[transaction.type] || transaction.type;
  const { jsPDF } = window.jspdf;

  // Create new document in portrait mode
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Colors
  const primaryColor = [65, 105, 225]; // Royal Blue
  const secondaryColor = [220, 220, 220]; // Light Grey

  // Add logo placeholder (you can replace this with an actual image)
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(20, 20, 170, 40, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("POKEMON BANK", 105, 40, { align: "center" });

  doc.setFontSize(12);
  doc.text("Su banco de confianza", 105, 50, { align: "center" });

  // Add receipt title
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 70, 190, 70);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.text("COMPROBANTE DE TRANSACCIÓN", 105, 80, { align: "center" });

  doc.line(20, 85, 190, 85);

  // Add current date and time
  const now = new Date();
  const formattedDate = now.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("es-ES");

  // Add transaction info box
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.roundedRect(20, 95, 170, 80, 3, 3, "F");

  // Add payment details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Fecha: ${formattedDate}`, 30, 110);
  doc.text(`Hora: ${formattedTime}`, 30, 120);
  doc.text(`Tipo de transacción: ${transactionType}`, 30, 130);

  // Format amount with commas and 2 decimal places
  const formattedAmount = new Intl.NumberFormat("es-SV", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(transaction.amount);

  doc.setFont("helvetica", "bold");
  doc.text(`Monto: ${formattedAmount}`, 30, 140);

  // Add transaction description if available
  if (transaction.description) {
    doc.setFont("helvetica", "normal");
    doc.text(`Descripción: ${transaction.description}`, 30, 150);
  }

  // Add transaction ID with fancier formatting
  const transactionId = transaction.id;
  doc.setFont("helvetica", "bold");
  doc.text(`ID de Transacción: #${transactionId}`, 30, 160);

  // Add notice
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Este documento es un comprobante válido de su transacción.",
    105,
    240,
    { align: "center" }
  );
  doc.text("Conserve este documento para futuros reclamos.", 105, 245, {
    align: "center",
  });

  // Add decorative elements
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.line(20, 260, 190, 260);

  // Add footer
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Gracias por usar Pokemon Bank", 105, 270, { align: "center" });

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("www.pokemonbank.com | Servicio al cliente: 2222-3333", 105, 280, {
    align: "center",
  });

  // Add border to the whole receipt
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.rect(15, 15, 180, 270);

  // Save the PDF
  doc.save(`comprobante-${transactionId}.pdf`);
};
