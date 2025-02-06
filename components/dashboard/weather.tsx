"use client";

import { saveWeather, StateWeather } from "@/lib/actions";
import { Settings } from "@/lib/definitions";
import { Button } from "@/ui/button";
import { MapIcon, QrCodeIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Save } from "lucide-react";
import { useActionState } from "react";

export default function Weather({
  settings,
}: {
  settings: Settings["weather"];
}) {
  const initialState: StateWeather = {
    message: null,
    errors: {},
  };

  const [state, formAction] = useActionState(saveWeather, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <div className="mt-2 rounded-md">
            <div className="flex items-center justify-between">
              <label htmlFor="active" className="text-sm font-medium">
                Active:
              </label>
              <label className="switch">
                <input
                  id="active"
                  name="active"
                  type="checkbox"
                  defaultChecked={settings.active}
                  className="peer block w-full flex-grow rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="active-error"
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div id="active-error" aria-live="polite" aria-atomic="true">
            {state.errors?.active &&
              state.errors.active.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Search location via city name or coordinates:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={settings.location}
                placeholder="Search location"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="location-error"
                aria-label="Search location via city name or coordinates"
              />
              <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="location-error" aria-live="polite" aria-atomic="true">
            {state.errors?.location &&
              state.errors.location.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* qrcode */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Activate to show QR code for the weather:
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="qrcode"
                  name="qrcode"
                  type="checkbox"
                  defaultChecked={settings.qrcode}
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="qrcode-error"
                  aria-label="Activate to show QR code for the weather"
                />
                <label
                  htmlFor="qrcode"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  QR Code <QrCodeIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="qrcode-error" aria-live="polite" aria-atomic="true">
            {state.errors?.qrcode &&
              state.errors.qrcode.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* graphic */}
        <div className="mb-4">
          <label htmlFor="graphic" className="mb-2 block text-sm font-medium">
            Weather graphics
          </label>
          <div className="relative">
            <select
              id="graphic"
              name="graphic"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={settings.graphic}
              aria-describedby="graphic-error"
            >
              <option value="" disabled>
                --Select a date option--
              </option>
              <option value="Classic">Classic</option>
              <option value="Animated">Animated</option>
            </select>
            <SparklesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="graphic-error" aria-live="polite" aria-atomic="true">
            {state.errors?.graphic &&
              state.errors.graphic.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Errors */}
        <div aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button className="cursor-pointer" type="submit">
          <Save />
          <span>Save</span>
        </Button>
      </div>
    </form>
  );
}
