import React from 'react';

export default function Terms() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Termini e <span className="text-sky-500">Condizioni</span>
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
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduzione e Accettazione</h2>
                        <p className="leading-relaxed">
                            Benvenuto su WaterMarket. Utilizzando il nostro sito web e i nostri servizi, accetti integralmente i presenti Termini e Condizioni.
                            Se non accetti queste condizioni, ti invitiamo a non utilizzare la piattaforma. WaterMarket si riserva il diritto di modificare questi termini in qualsiasi momento, dandone comunicazione agli utenti.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Registrazione Account e Sicurezza</h2>
                        <p className="leading-relaxed">
                            Per utilizzare alcune funzionalità del sito (come vendere o acquistare), è necessario registrarsi creando un account.
                            L'utente è responsabile della custodia delle proprie credenziali di accesso e di tutte le attività svolte tramite il proprio account.
                            È vietato fornire informazioni false o ingannevoli durante la registrazione.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Regole per Venditori e Acquirenti</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Venditori:</strong> Devono descrivere accuratamente i prodotti, segnalando eventuali difetti. È vietata la vendita di materiale rubato, contraffatto o illegale.</li>
                            <li><strong>Acquirenti:</strong> Si impegnano a pagare il prezzo concordato e a collaborare per la ricezione della spedizione.</li>
                            <li>WaterMarket agisce come intermediario e non è responsabile diretto della qualità dei beni scambiati tra privati, salvo ove esplicitamente indicato dai servizi di garanzia.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Pagamenti, Commissioni e Spedizioni</h2>
                        <p className="leading-relaxed">
                            I pagamenti avvengono tramite piattaforme sicure. WaterMarket potrebbe trattenere una commissione sul venduto per coprire i costi di gestione e protezione acquirenti.
                            Le spedizioni sono gestite tramite i nostri partner logistici; l'utente è tenuto a fornire un indirizzo corretto per evitare mancata consegna.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Limitazione di Responsabilità</h2>
                        <p className="leading-relaxed">
                            WaterMarket non sarà responsabile per danni indiretti, incidentali o consequenziali derivanti dall'uso del servizio, inclusi, a titolo esemplificativo, perdita di profitti o dati.
                            L'uso della piattaforma è a proprio rischio esclusivo dell'utente.
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
