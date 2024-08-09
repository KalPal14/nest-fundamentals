import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop(SchemaTypes.Mixed)
  event: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
