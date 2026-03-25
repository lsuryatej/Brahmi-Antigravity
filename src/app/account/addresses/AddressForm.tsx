"use client";

import { useActionState } from "react";
import {
  createAddressAction,
  updateAddressAction,
  type AddressState,
} from "./actions";
import type { MailingAddress } from "@/lib/shopify/queries";

// Indian states for dropdown
const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

interface Props {
  address?: MailingAddress; // if provided → edit mode; else → create mode
  onCancel?: () => void;
}

const initialState: AddressState = {};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-mono text-sm " +
  "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent " +
  "transition-colors placeholder:text-muted-foreground";

export default function AddressForm({ address, onCancel }: Props) {
  const isEdit = !!address;
  const action = isEdit ? updateAddressAction : createAddressAction;
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} noValidate className="space-y-4">
      {state.success && (
        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 font-mono">
          ✓ Address {isEdit ? "updated" : "saved"} successfully.
        </div>
      )}
      {state.error && (
        <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-mono">
          {state.error}
        </div>
      )}

      {/* Hidden address ID for edit mode */}
      {isEdit && (
        <input type="hidden" name="addressId" value={address.id} />
      )}

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="block text-xs font-mono font-medium mb-1.5">First name</label>
          <input id="firstName" name="firstName" type="text" defaultValue={address?.firstName ?? ""} required className={inputClass} placeholder="Priya" />
          {state.fieldErrors?.firstName && <p className="mt-1 text-xs text-red-600 font-mono">{state.fieldErrors.firstName[0]}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-mono font-medium mb-1.5">Last name</label>
          <input id="lastName" name="lastName" type="text" defaultValue={address?.lastName ?? ""} required className={inputClass} placeholder="Sharma" />
          {state.fieldErrors?.lastName && <p className="mt-1 text-xs text-red-600 font-mono">{state.fieldErrors.lastName[0]}</p>}
        </div>
      </div>

      {/* Street address */}
      <div>
        <label htmlFor="address1" className="block text-xs font-mono font-medium mb-1.5">Street address</label>
        <input id="address1" name="address1" type="text" defaultValue={address?.address1 ?? ""} required className={inputClass} placeholder="Flat 4B, Mayfair Gardens" />
        {state.fieldErrors?.address1 && <p className="mt-1 text-xs text-red-600 font-mono">{state.fieldErrors.address1[0]}</p>}
      </div>

      {/* Apartment / Floor */}
      <div>
        <label htmlFor="address2" className="block text-xs font-mono font-medium mb-1.5">
          Apartment, floor, landmark{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <input id="address2" name="address2" type="text" defaultValue={address?.address2 ?? ""} className={inputClass} placeholder="Near Central Park" />
      </div>

      {/* City + PIN */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="block text-xs font-mono font-medium mb-1.5">City</label>
          <input id="city" name="city" type="text" defaultValue={address?.city ?? ""} required className={inputClass} placeholder="Mumbai" />
          {state.fieldErrors?.city && <p className="mt-1 text-xs text-red-600 font-mono">{state.fieldErrors.city[0]}</p>}
        </div>
        <div>
          <label htmlFor="zip" className="block text-xs font-mono font-medium mb-1.5">PIN code</label>
          <input id="zip" name="zip" type="text" inputMode="numeric" defaultValue={address?.zip ?? ""} required maxLength={6} className={inputClass} placeholder="400001" />
          {state.fieldErrors?.zip && <p className="mt-1 text-xs text-red-600 font-mono">{state.fieldErrors.zip[0]}</p>}
        </div>
      </div>

      {/* State */}
      <div>
        <label htmlFor="province" className="block text-xs font-mono font-medium mb-1.5">State</label>
        <select
          id="province"
          name="province"
          defaultValue={address?.province ?? ""}
          required
          className={`${inputClass} bg-muted/30`}
        >
          <option value="">Select state…</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {state.fieldErrors?.province && <p className="mt-1 text-xs text-red-600 font-mono">{state.fieldErrors.province[0]}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="addrPhone" className="block text-xs font-mono font-medium mb-1.5">
          Phone{" "}
          <span className="text-muted-foreground font-normal">(optional, for delivery)</span>
        </label>
        <input id="addrPhone" name="phone" type="tel" inputMode="tel" defaultValue={address?.phone ?? ""} className={inputClass} placeholder="+91 98765 43210" />
        {state.fieldErrors?.phone && <p className="mt-1 text-xs text-red-600 font-mono">{state.fieldErrors.phone[0]}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-[#63180c] hover:bg-[#a82914] text-[#f7f2e4]
                     font-sans font-semibold text-sm transition-all shadow
                     disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-[#f7f2e4] border-t-transparent rounded-full animate-spin" />
              Saving…
            </>
          ) : isEdit ? (
            "Update address"
          ) : (
            "Save address"
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-border font-mono text-sm
                       hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
