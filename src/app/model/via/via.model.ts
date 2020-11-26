import { ViaRequets } from './via.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class ViaModel implements  ViaRequets {
  
  
  OBJECTID: number;
  
  Name: string;
  GeoJson : string;

  constructor(p ?: ViaRequets){
    this.OBJECTID = p?.OBJECTID;
    this.Name = p?.Name;
    this.GeoJson = p?.GeoJson;
  }



}
  