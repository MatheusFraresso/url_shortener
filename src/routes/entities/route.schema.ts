import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type RouteDocument = HydratedDocument<Route>;

@Schema()
export class Route extends Document {
  @Prop()
  long_url: string;

  @Prop()
  short_url: string;

  @Prop()
  id: number;
  @Prop({ default: '' })
  title: string;

  @Prop({ default: 0 })
  counter: number;
}
export const RouteSchema = SchemaFactory.createForClass(Route);
