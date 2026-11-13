import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  Store,
  Truck,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { SantaCruzMap } from "./SantaCruzMap";
import { TALLER_LOCATION } from "../../data/zones";
import type { Order } from "../../types";
import confetti from "canvas-confetti";

export const CheckoutView: React.FC = () => {
  const {
    items,
    subtotal,
    discountAmount,
    couponCode,
    setCurrentView,
    clearCart,
    setLastOrder,
  } = useCart();
  const { user } = useAuth();

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      setCurrentView("catalog");
    }
  }, [items, setCurrentView]);

  // Form State
  const [buyerName, setBuyerName] = useState(
    user?.name && user.id !== "guest" ? user.name : "",
  );
  const [phone, setPhone] = useState(user?.phone || "");
  const [recipientName, setRecipientName] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery",
  );

  // Delivery address details
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");

  // Santa Cruz Map location & calculated fee
  const [mapLat, setMapLat] = useState(-17.7686); // default near Equipetrol
  const [mapLng, setMapLng] = useState(-63.1956);
  const [ring, setRing] = useState(3);
  const [deliveryFee, setDeliveryFee] = useState(15);
  const [zoneName, setZoneName] = useState(
    "3er Anillo (Equipetrol / Zona Central)",
  );

  // Scheduling
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState<"manana" | "tarde">("tarde");

  // QR Payment & Validation States
  const [qrStep, setQrStep] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [qrTimeLeft, setQrTimeLeft] = useState(600); // 10 minutes in seconds

  // Fee calculation: if pickup, fee is strictly 0 Bs.
  const effectiveDeliveryFee = deliveryType === "pickup" ? 0 : deliveryFee;
  const totalAmount = Math.max(
    0,
    subtotal - discountAmount + effectiveDeliveryFee,
  );

  // Timer countdown for QR
  useEffect(() => {
    if (!qrStep) return;
    const interval = setInterval(() => {
      setQrTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [qrStep]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLocationSelect = (
    lat: number,
    lng: number,
    r: number,
    fee: number,
    zName: string,
  ) => {
    setMapLat(lat);
    setMapLng(lng);
    setRing(r);
    setDeliveryFee(fee);
    setZoneName(zName);
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim()) {
      alert("Por favor ingresa tu nombre para la orden.");
      return;
    }
    if (!phone.trim()) {
      alert(
        "Por favor ingresa tu número de WhatsApp para enviarte el comprobante de entrega.",
      );
      return;
    }
    if (deliveryType === "delivery" && !address.trim()) {
      alert("Por favor ingresa la dirección escrita de entrega en Santa Cruz.");
      return;
    }
    setQrStep(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleValidateQRPayment = () => {
    setIsValidating(true);

    // Simulate real-time webhook validation from Bolivian QR Simple (BCP/BNB/ASFI)
    setTimeout(() => {
      setIsValidating(false);

      const newOrder: Order = {
        id: `DEC-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString("es-BO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        items: [...items],
        delivery: {
          type: deliveryType,
          buyerName,
          phone,
          recipientName: recipientName || buyerName,
          address:
            deliveryType === "delivery" ? address : TALLER_LOCATION.address,
          neighborhood:
            deliveryType === "delivery" ? neighborhood : "Equipetrol",
          reference:
            deliveryType === "delivery" ? reference : "Taller Central DecoArt",
          ring: deliveryType === "delivery" ? ring : 3,
          latitude: mapLat,
          longitude: mapLng,
          deliveryDate,
          timeSlot,
          deliveryFee: effectiveDeliveryFee,
        },
        subtotal,
        deliveryFee: effectiveDeliveryFee,
        discount: discountAmount,
        total: totalAmount,
        paymentMethod: "qr_simple",
        status: "paid",
      };

      setLastOrder(newOrder);
      clearCart();

      // Confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FF2A85", "#F59E0B", "#0EA5E9", "#10B981"],
      });

      setCurrentView("confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2200);
  };

  // Dynamic QR Payload standard for QR Simple Bolivia
  const qrString = `00020101021226580014bo.bcp.qrsimple0112DECOART-SCZ520459995303068540${totalAmount}.005802BO5915DECOART_STORE6010SANTA_CRUZ62230519ORDEN-DECOART-${Date.now().toString().slice(-6)}6304`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => {
            if (qrStep) {
              setQrStep(false);
            } else {
              setCurrentView("catalog");
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-deco-pink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {qrStep ? "Modificar datos de entrega" : "Volver al catálogo"}
          </span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span
            className={`px-2.5 py-1 rounded-full ${!qrStep ? "bg-deco-pink text-white" : "bg-slate-200 text-slate-700"}`}
          >
            1. Datos & Envío
          </span>
          <span>→</span>
          <span
            className={`px-2.5 py-1 rounded-full ${qrStep ? "bg-deco-pink text-white" : "bg-slate-200 text-slate-700"}`}
          >
            2. Pago QR Simple
          </span>
        </div>
      </div>

      {!qrStep ? (
        /* STEP 1: CONTACT, DELIVERY OPTIONS (MAP) & SUMMARY */
        <form
          onSubmit={handleContinueToPayment}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column (8 cols): Delivery & Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Method Choice Tabs */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Truck className="w-5 h-5 text-deco-pink" /> 1. Modalidad de
                Entrega en Santa Cruz
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {/* Option 1: Delivery */}
                <button
                  type="button"
                  onClick={() => setDeliveryType("delivery")}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    deliveryType === "delivery"
                      ? "border-deco-pink bg-pink-50/50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-pink-100 text-deco-pink flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                    {deliveryType === "delivery" && (
                      <CheckCircle2 className="w-5 h-5 text-deco-pink" />
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">
                      Envío a Domicilio
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Desde <strong className="text-emerald-600">15 Bs</strong>{" "}
                      (Hasta 4to anillo)
                    </div>
                  </div>
                </button>

                {/* Option 2: Pickup in Store */}
                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    deliveryType === "pickup"
                      ? "border-emerald-500 bg-emerald-50/50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Store className="w-4 h-4" />
                    </div>
                    {deliveryType === "pickup" && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">
                      Recojo en Taller
                    </div>
                    <div className="text-[11px] text-emerald-600 font-extrabold">
                      ¡0 Bs. GRATIS!
                    </div>
                  </div>
                </button>
              </div>

              {/* Delivery Details Condition */}
              {deliveryType === "delivery" ? (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1">
                      Ubicación en el Mapa de Santa Cruz:
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Haz clic en el mapa de anillos para calcular la tarifa
                      exacta automáticamente.
                    </p>

                    {/* Interactive Leaflet Map */}
                    <SantaCruzMap
                      currentLat={mapLat}
                      currentLng={mapLng}
                      onLocationSelect={handleLocationSelect}
                    />
                  </div>

                  {/* Dirección escrita: etiquetas de una línea y campos alineados en la misma fila */}
                  <div className="pt-3 space-y-3">
                    <div className="text-xs font-extrabold text-slate-800">
                      Dirección de entrega
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-700 mb-1.5 whitespace-nowrap">
                          Calle / Avenida y Número{" "}
                          <span className="text-deco-pink">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Av. San Martín, Calle 7 #45"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full h-10 px-3 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-700 mb-1.5 whitespace-nowrap">
                          Barrio / Condominio / Zona{" "}
                          <span className="text-deco-pink">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Equipetrol, Las Palmas, Plan 3000"
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          className="w-full h-10 px-3 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-slate-700 mb-1.5">
                        Punto de referencia{" "}
                        <span className="font-medium text-slate-400">
                          (opcional)
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Casa de dos pisos con rejas blancas, frente a la farmacia"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full h-10 px-3 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Pickup Details */
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 text-emerald-900">
                  <div className="font-extrabold flex items-center gap-2">
                    <Store className="w-4 h-4 text-emerald-700" />{" "}
                    {TALLER_LOCATION.name}
                  </div>
                  <p className="text-slate-700">
                    <strong>Dirección:</strong> {TALLER_LOCATION.address}
                  </p>
                  <p className="text-slate-700">
                    <strong>Horarios:</strong> {TALLER_LOCATION.hours}
                  </p>
                  <div className="p-2 bg-white/80 rounded-lg text-[11px] text-emerald-800 font-medium">
                    {TALLER_LOCATION.pickupNotice}
                  </div>
                </div>
              )}
            </div>

            {/* Date & Time Slot Selection */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" /> 2. Programación
                de Fecha y Horario
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Fecha deseada:
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Franja Horaria:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTimeSlot("manana")}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all text-center ${
                        timeSlot === "manana"
                          ? "border-deco-pink bg-pink-50 text-deco-pink"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Mañana
                      <span className="block text-[10px] font-normal text-slate-500">
                        09:00 - 12:00
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTimeSlot("tarde")}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all text-center ${
                        timeSlot === "tarde"
                          ? "border-deco-pink bg-pink-50 text-deco-pink"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Tarde
                      <span className="block text-[10px] font-normal text-slate-500">
                        14:00 - 18:00
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Contact Information */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-600" /> 3. Datos de
                Contacto
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp para Comprobante y Tracking *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 70012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre de la persona que recibe el bouquet (Si es un regalo
                  sorpresa)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Andrea Roca (Dejar vacío si recibes tú mismo)"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                />
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Order Summary & Next Step CTA */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24 space-y-4">
              <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-3">
                Resumen de tu Pedido
              </h3>

              {/* Items List Preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2.5 text-xs py-1 border-b border-slate-50 last:border-none"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Cant: {item.quantity} •{" "}
                        {item.customization.selectedNumber
                          ? `#${item.customization.selectedNumber}`
                          : ""}{" "}
                        {item.customization.selectedPalette}
                      </div>
                      <div className="font-extrabold text-deco-pink">
                        Bs. {item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>
                    Subtotal ({items.reduce((a, b) => a + b.quantity, 0)}{" "}
                    bouquets):
                  </span>
                  <span className="font-bold text-slate-800">
                    Bs. {subtotal}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Descuento cupón ({couponCode}):</span>
                    <span>- Bs. {discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Tarifa de Entrega:</span>
                  <span
                    className={`font-bold ${effectiveDeliveryFee === 0 ? "text-emerald-600" : "text-slate-800"}`}
                  >
                    {effectiveDeliveryFee === 0
                      ? "0 Bs. (Recojo en Taller)"
                      : `Bs. ${effectiveDeliveryFee} (${zoneName.split("(")[0]})`}
                  </span>
                </div>

                <div className="border-t-2 border-slate-200 pt-3 flex justify-between items-baseline">
                  <span className="font-black text-slate-900 text-sm">
                    TOTAL A PAGAR:
                  </span>
                  <span className="text-2xl font-black text-deco-pink">
                    Bs. {totalAmount}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-deco-pink to-deco-pink-600 hover:from-deco-pink-600 hover:to-deco-pink-700 text-white font-black py-4 px-4 rounded-2xl shadow-lg shadow-pink-200 transition-all text-sm flex items-center justify-center gap-2 active:scale-98"
              >
                <QrCode className="w-5 h-5" />
                <span>Generar Pago con QR Simple</span>
              </button>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1">
                <div className="font-bold text-slate-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Cobro
                  transparente y seguro:
                </div>
                <p>
                  • El QR se generará por el monto exacto de{" "}
                  <strong>Bs. {totalAmount}</strong>.
                </p>
                <p>
                  • Aceptado por cualquier banco de Bolivia a través de Simple
                  QR.
                </p>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* STEP 2: DYNAMIC QR PAYMENT & VALIDATION */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-pink-100 text-deco-pink font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" /> Pago Digital
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Escanea y Paga con QR Simple
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Abre la aplicación de tu banco en Bolivia (BCP, BNB, Banco Unión,
              Ganadero, Mercantil, etc.) y escanea el código por el monto
              exacto.
            </p>
          </div>

          {/* Amount Badge & Countdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase">
                Monto Total a Transferir
              </div>
              <div className="text-2xl font-black text-deco-pink">
                Bs. {totalAmount}.00
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-bold uppercase">
                Tiempo Restante del QR
              </div>
              <div className="text-sm font-black text-amber-600 flex items-center gap-1 justify-end">
                <Clock className="w-4 h-4" /> {formatTimer(qrTimeLeft)}
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-pink-200 rounded-3xl relative">
            <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-100">
              <QRCodeSVG
                value={qrString}
                size={220}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: "/resources/logo_1.jpg",
                  x: undefined,
                  y: undefined,
                  height: 38,
                  width: 38,
                  excavate: true,
                }}
              />
            </div>

            <div className="mt-4 text-center space-y-1">
              <div className="text-xs font-extrabold text-slate-800">
                Beneficiario: DecoArt - Santa Cruz de la Sierra
              </div>
              <div className="text-[11px] text-slate-500">
                Glosa sugerida: "Bouquet DecoArt - {buyerName || "Cliente"}"
              </div>
            </div>
          </div>

          {/* Validation CTA Button */}
          <div className="space-y-3">
            <button
              onClick={handleValidateQRPayment}
              disabled={isValidating}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black py-4 px-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all text-sm flex items-center justify-center gap-2 active:scale-98"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verificando Acreditación Bancaria en Vivo...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>He realizado el Pago / Validar QR (Simular Éxito)</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Al hacer clic en validar, el sistema verificará el webhook
              bancario y enviará la orden de armado directamente al taller.
            </p>
          </div>

          {/* Delivery Recap Note */}
          <div className="p-3 bg-pink-50/70 border border-pink-100 rounded-xl text-xs text-slate-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-deco-pink flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">
                Modalidad seleccionada:
              </strong>{" "}
              {deliveryType === "delivery"
                ? `Envío a domicilio (${address}, ${neighborhood} - ${zoneName})`
                : "Recojo en Taller Central (Equipetrol - 0 Bs.)"}{" "}
              • Fecha: {deliveryDate} (
              {timeSlot === "manana"
                ? "Mañana 09:00 - 12:00"
                : "Tarde 14:00 - 18:00"}
              ).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
