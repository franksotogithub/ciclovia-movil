import { PuntoCicloViaRequest } from './puntoCicloVia.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class PuntoCicloViaModel implements  PuntoCicloViaRequest {
  
  
  id_punto_ciclovia: number;
  
  @required({message:'*Este campo es obligatorio'})  
  ciclovia: string;

  @required({message:'*Este campo es obligatorio'})  
  distrito : string;

  @required({message:'*Este campo es obligatorio'})  
  tramo: string;

  @required({message:'*Este campo es obligatorio'})  
  usuario: string;

  @required({message:'*Este campo es obligatorio'})  
  seccion_vial_normativa: string;

  @required({message:'*Este campo es obligatorio'})  
  seccion_vial_actual: string;

  @required({message:'*Este campo es obligatorio'})  
  tipo: string;

 

  @required({message:'*Este campo es obligatorio'}) 
  ele_seg_tipo: string;

  @required({message:'*Este campo es obligatorio'}) 
  ele_seg_estado: string;

  @required({message:'*Este campo es obligatorio'}) 
  ele_senial_ver_tipo: string;

  @required({message:'*Este campo es obligatorio'}) 
  ele_senial_ver_estado: string;

  @required({message:'*Este campo es obligatorio'}) 
  ele_senial_hor_tipo: string;

  @required({message:'*Este campo es obligatorio'}) 
  ele_senial_hor_valor: string;

  @required({message:'*Este campo es obligatorio'}) 
  supe_rodadura_tipo: string;

  @required({message:'*Este campo es obligatorio'}) 
  supe_rodadura_valor: string;

  fecha: Date;

  
  latitud: number;

  longitud: number;

  @required({message:'*Este campo es obligatorio'}) 
  tipo_ancho: number;
  
  is_valid: boolean;

  constructor(p ?: PuntoCicloViaRequest){
    this.id_punto_ciclovia = p?.id_punto_ciclovia;
    this.ciclovia = p?.ciclovia;
    this.distrito = p?.distrito;
    this.tramo = p?.tramo;
    this.usuario = p?.usuario;
    this.seccion_vial_normativa = p?.seccion_vial_normativa;
    this.seccion_vial_actual = p?.seccion_vial_actual;
    this.tipo = p?.tipo;
    this.tipo_ancho = p?.tipo_ancho;
   
    this.ele_seg_tipo = p?.ele_seg_tipo;
    this.ele_seg_estado = p?.ele_seg_estado;
    this.ele_senial_ver_tipo = p?.ele_senial_ver_tipo;
    this.ele_senial_ver_estado = p?.ele_senial_ver_estado;
    this.ele_senial_hor_tipo = p?.ele_senial_hor_tipo;
    this.ele_senial_hor_valor = p?.ele_senial_hor_valor;
    this.supe_rodadura_tipo = p?.supe_rodadura_tipo;
    this.supe_rodadura_valor = p?.supe_rodadura_valor;
    this.fecha = p?.fecha;
    this.latitud = p?.latitud;
    this.longitud = p?.longitud;
   
  }



}
  