import { UsuarioRequest } from './usuario.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class UsuarioModel implements  UsuarioRequest {
  
  id: number;
  @prop()
  @required({message:'*Se requiere el usuario'}) 
  username: string;

  @prop()
  @required({message:'*Se requiere el password'}) 
  password : string;
  
/*  @required() 
  password_repeat : string;*/
  @prop()
  @required({message:'*Se requiere los nombres'}) 
  name: string;

  @prop()
  @required({message:'*Se requiere el primer apellido'}) 
  first_name: string;

  @prop()
  @required({message:'*Se requiere el segundo apellido'}) 
  last_name: string;

  createdAt :string;

  updatedAt:string;

  is_valid:boolean;



  constructor(p ?: UsuarioRequest){
    this.id = p?.id;
    this.username = p?.username;
    this.password = p?.password;
    this.name = p?.name;
    this.first_name = p?.first_name;
    this.last_name = p?.last_name;
    this.createdAt = p?.createdAt;
    this.updatedAt = p?.updatedAt;   
  }


}
  