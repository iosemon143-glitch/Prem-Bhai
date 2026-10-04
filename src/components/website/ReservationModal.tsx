import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { COLOR_THEMES } from '../../data/templates';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
  });

  if (!isOpen) return null;

  const isBn = config.lang === 'bn';
  const theme = COLOR_THEMES[config.themeColor] || COLOR_THEMES.rose;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              {isBn ? 'টেবিল বুকিং রিজার্ভেশন' : 'Reserve a Table'}
            </h3>
            <p className="text-xs text-neutral-500">{config.brandName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-neutral-900">
              {isBn ? 'রিজার্ভেশন কনফার্ম করা হয়েছে!' : 'Reservation Request Confirmed!'}
            </h4>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto">
              {isBn
                ? `${formData.date} তারিখে ${formData.time} মিনিটে ${formData.guests} জনের টেবিল রাখা হয়েছে। আমরা ফোনে কনফার্ম করব।`
                : `Table for ${formData.guests} guests reserved for ${formData.date} at ${formData.time}. We will send a confirmation call.`}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md"
            >
              {isBn ? 'ঠিক আছে' : 'Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'আপনার নাম' : 'Name'} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={isBn ? 'যেমন: রাফাত মাহমুদ' : 'e.g. John Doe'}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'মোবাইল নাম্বার' : 'Phone'} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+880 1700-000000"
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-neutral-500" />
                  <span>{isBn ? 'অতিথি' : 'Guests'}</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-lg border border-neutral-300"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {isBn ? 'জন' : 'people'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-500" />
                  <span>{isBn ? 'তারিখ' : 'Date'}</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-2 py-2 rounded-lg border border-neutral-300 text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  <span>{isBn ? 'সময়' : 'Time'}</span>
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-2 py-2 rounded-lg border border-neutral-300 text-[11px]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-2.5 px-4 text-xs font-bold text-white ${theme.primary} ${theme.primaryHover} rounded-lg shadow-sm`}
              >
                {isBn ? 'বুকিং নিশ্চিত করুন' : 'Confirm Reservation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
