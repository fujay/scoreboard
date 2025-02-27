"use client";

import { saveWeather, StateWeather } from "@/lib/actions";
import { Settings } from "@/lib/definitions";
import { Button } from "@/ui/button";
import { Save } from "lucide-react";
import { useActionState } from "react";

export default function Multimedia({
  settings,
}: {
  settings: Settings["general"];
}) {
  const initialState: StateWeather = {
    message: null,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    saveWeather,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <div className="mt-2 rounded-md">
            <div className="flex items-center justify-between">
              <label htmlFor="active" className="text-sm font-medium">
                Active:
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

        {/* Errors */}
        <div aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit" disabled={isPending}>
          <Save />
          <span>{isPending ? "Saving..." : "Save"}</span>
        </Button>
      </div>
    </form>
  );
}
