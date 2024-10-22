import { z } from "zod";

// esquemas
export const bandwidthSchema = z.object({
    amount: z.number({
        required_error: 'Amount is required!',
    }).nonnegative(),
    unit: z.enum(['MB', 'GB', 'TB'], {
        required_error: 'Unit is required!',
    }).transform((val) => val.toUpperCase())
});

export const signalSchema = z.object({
    id: z.string(),
    type: z.string({ required_error: 'Type is required!' }).trim().transform((val) => val.toUpperCase()),
    subType: z.string({ required_error: 'SubType is required!' }).trim().transform((val) => val.toUpperCase()),
    bandwidth: bandwidthSchema.optional(),
    observation: z.string().trim().optional().default(''),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Types
export type SignalType = z.infer<typeof signalSchema>;
export type SignalBandwidthType = z.infer<typeof bandwidthSchema>;

export type BandwidthFormData = Pick<
    SignalBandwidthType,
    'amount' | 'unit'
>;

export type SignalFormData = Pick<
    SignalType,
  'type' | 'subType' | 'observation' | 'bandwidth'
>

// response APIs
export const responseAPISignal = z.object({
    msg: z.string().optional(),
    payload: signalSchema
})
export const responseAPISignals = z.array(signalSchema)
