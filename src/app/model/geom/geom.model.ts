import { GeomRequest } from './geom.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class GeomModel implements  GeomRequest {
  
 
  type: string;
  coordinates : string;

  

  constructor(p ?: GeomRequest){   
    this.type = p?.type;
    this.coordinates = p?.coordinates;    
  }


}
  