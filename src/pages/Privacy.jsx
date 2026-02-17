import React from 'react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Privacy <span className="text-sky-500">Policy</span>
                    </h1>
                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2 mt-4">
                        <p className="text-yellow-500 text-sm font-bold uppercase tracking-wider">
                            BOZZA: Questo documento è un esempio a scopo illustrativo per la fase di sviluppo.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-white/5 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Titolare del Trattamento</h2>
                        <p className="leading-relaxed">
                            Il titolare del trattamento dei dati è <strong>WaterMarket S.r.l.</strong> (fittizio), con sede legale in Via del Vento 10, Milano, Italia.
                            Per qualsiasi informazione o richiesta relativa alla privacy, è possibile contattarci all'indirizzo email: <span className="text-sky-400">privacy@watermarket.it</span>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Tipologia di dati raccolti</h2>
                        <p className="leading-relaxed mb-4">
                            Raccogliamo diverse tipologie di dati personali per fornire e migliorare il nostro servizio:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Dati Anagrafici:</strong> Nome, cognome, indirizzo email, numero di telefono, indirizzo di spedizione.</li>
                            <li><strong>Dati di Pagamento:</strong> Informazioni necessarie per processare le transazioni (gestite tramite gateway sicuri di terze parti).</li>
                            <li><strong>Dati di Navigazione:</strong> Indirizzo IP, tipo di browser, pagine visitate e durata della sessione.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Finalità del Trattamento</h2>
                        <p className="leading-relaxed">
                            I dati raccolti vengono utilizzati per le seguenti finalità:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>Erogazione del servizio di compravendita e gestione degli account utente.</li>
                            <li>Elaborazione e spedizione degli ordini.</li>
                            <li>Assistenza clienti e supporto tecnico.</li>
                            <li>Comunicazioni di servizio e, previo consenso, invio di newsletter promozionali.</li>
                            <li>Adempimento degli obblighi legali e fiscali.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Condivisione con Terze Parti</h2>
                        <p className="leading-relaxed">
                            Non vendiamo i tuoi dati a terzi. Tuttavia, potremmo condividere alcune informazioni strettamente necessarie con fornitori di servizi affidabili, tra cui:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li><strong>Corrieri e Logistica:</strong> Per la consegna dei prodotti acquistati o venduti.</li>
                            <li><strong>Gateway di Pagamento:</strong> Per elaborare transazioni sicure (es. Stripe, PayPal).</li>
                            <li><strong>Fornitori di Servizi IT:</strong> Per hosting, manutenzione e sicurezza della piattaforma.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. I tuoi Diritti</h2>
                        <p className="leading-relaxed">
                            In conformità con il GDPR, hai il diritto di accedere, rettificare, cancellare i tuoi dati o limitarne il trattamento. Puoi esercitare questi diritti contattandoci ai recapiti indicati.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-white/10 text-sm text-slate-500 text-center">
                        <p>Ultimo aggiornamento: 15 Febbraio 2026</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
