import { useForm } from "react-hook-form";

const App = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();




  const onSubmit = handleSubmit((values) => {
    console.log(values);
    alert('enviado datos...');

    reset()


    //anstes de enviar
    //fetch axios etc.
  });




  return (
    <form onSubmit={onSubmit}>
      {/* nombre */}
      <label htmlFor="nombre">Nombre: </label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "Nombre debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "Nombre debe tener maximo 20 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      {/* correo */}
      <label htmlFor="correo">Correo: </label>
      <input
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
          pattern: {
            value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
            message: "Correo no valido",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "El password es requerido",
          },
          minLength: {
            value: 8,
            message: "El password debe tener como minimo 8 caracteres",
          },
          maxLength: {
            value: 20,
            message: "El password debe tener como maximo 20 caracteres",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* confirmarPassword */}
      <label htmlFor="confirmarPassword">Confirmar Password: </label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "El password es requerido",
          },
          minLength: {
            value: 8,
            message: "El password debe tener como minimo 8 caracteres",
          },
          maxLength: {
            value: 20,
            message: "El password debe tener como maximo 20 caracteres",
          },
          validate: (value) => {
            return value === watch("password")
              ? true
              : "No coinsiden el password";
          },
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}

      {/* fechaNacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de Nacimiento: </label>
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: "true",
            message: "Fecha de nacimiento es requerida",
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edadUser =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            return edadUser >= 18 ? true : "debe ser mayor de edad";
          },
        })}
      />
      {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

      {/* pais */}
      <label htmlFor="pais">Pais: </label>
      <select {...register("pais")}>
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>
      {watch("pais") === "co" && (
        <>
          <input
            type="text"
            placeholder="Departamento"
            {...register("departamento", {
              required: {
                value: true,
                message: "Departamento es requerido",
              },
            })}
          />
            {errors.departamento && <span>{errors.departamento.message}</span>}
        </>
      )}

      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input type="file" onChange={(e)=>{
        console.log(e.target.files[0]);
        setValue('fotoDelUser', e.target.files[0].name )
         
      }} />

      {/* terminos */}
      <label htmlFor="terminos">Hacepto Termino y Condiciones</label>
      <input type="checkbox" {...register("terminos",{
        required:{
          value:true,
          message:'debe aceptar los terminos y condiciones'
        }
      })} />

      {
        errors.terminos && <span>{errors.terminos.message}</span>
      }

      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
};
export default App;
