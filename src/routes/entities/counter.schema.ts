import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type RouteDocument = HydratedDocument<Counter>;

@Schema()
export class Counter extends Document {
  @Prop()
  seq_value: number;
}
export const CounterSchema = SchemaFactory.createForClass(Counter);
