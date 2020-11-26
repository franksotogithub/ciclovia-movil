import { DistritoRequest } from './distrito.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class DistritoModel implements  DistritoRequest {
  
  
  OBJECTID: number;
  
  NOMBDIST: string;
  GeoJson : string;

  constructor(p ?: DistritoRequest){
    this.OBJECTID = p?.OBJECTID;
    this.NOMBDIST = p?.NOMBDIST;
    this.GeoJson = p?.GeoJson;
  }



}
  