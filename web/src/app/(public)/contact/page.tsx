'use client'

import React, { useState } from 'react'
import { Briefcase, Headphones, MapPin, CheckCircle, Send } from 'lucide-react'

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        workEmail: '',
        companyName: '',
        solutionType: '3PL & Freight Logistics',
        estimatedOrders: '10,000 - 50,000 / month',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                    Get in Touch
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                    Let's Build Your Supply Chain Stack.
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed">
                    Have questions about enterprise provisioning, custom module SDKs, or multi-tenant database migration? Our solutions engineering team is ready.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
                {/* Contact Info & Office Column */}
                <div className="space-y-8">
                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-4">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-lg mb-1">Enterprise Sales</h3>
                        <p className="text-xs text-zinc-400 mb-4">Direct solutions architecture inquiries.</p>
                        <a href="mailto:sales@logicore.io" className="text-blue-400 text-sm font-semibold hover:underline block">sales@logicore.io</a>
                        <span className="text-zinc-500 text-xs">+1 (800) 555-0199</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4">
                            <Headphones className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-lg mb-1">Technical Support</h3>
                        <p className="text-xs text-zinc-400 mb-4">Support for active tenant accounts.</p>
                        <a href="mailto:support@logicore.io" className="text-emerald-400 text-sm font-semibold hover:underline block">support@logicore.io</a>
                        <span className="text-zinc-500 text-xs">24/7 Priority SLA Escalations</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold mb-4">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-lg mb-1">Global Headquarters</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            100 Logistics Tech Way, Suite 400<br />
                            San Francisco, CA 94107
                        </p>
                    </div>
                </div>

                {/* Interactive Demo Request Form Column */}
                <div className="lg:col-span-2 p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-xl">
                    {submitted ? (
                        <div className="py-16 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                            <p className="text-zinc-400 text-sm max-w-md mx-auto">
                                Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. A Senior Solutions Architect from LogiCore will contact you at <span className="text-white font-semibold">{formData.workEmail}</span> within 2 business hours.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-all"
                            >
                                Send Another Inquiry
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Request Enterprise Demo & Proposal</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        placeholder="Jane Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                                        Work Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.workEmail}
                                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                                        placeholder="jane@company.com"
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        placeholder="Apex Logistics Inc."
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                                        Primary Industry Solution
                                    </label>
                                    <select
                                        value={formData.solutionType}
                                        onChange={(e) => setFormData({ ...formData, solutionType: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="3PL & Freight Logistics">3PL & Freight Logistics</option>
                                        <option value="Manufacturing ERP Integration">Manufacturing ERP Integration</option>
                                        <option value="E-Commerce Multi-Warehouse">E-Commerce Multi-Warehouse</option>
                                        <option value="Cold Chain & Pharma">Cold Chain & Pharma</option>
                                        <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                                    Operational Message / Details
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us about your active fulfillment volume, warehouse locations, or current logistics stack..."
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-lg shadow-blue-600/30 active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Submit Request
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
