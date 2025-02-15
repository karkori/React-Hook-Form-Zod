# Custom Form with React Hook Form and Zod

Este proyecto es un formulario validado utilizando **React Hook Form** y **Zod** como esquema de validación.

## 📌 Características
- Validación de formularios con `react-hook-form` y `zod`
- Componentización con `CustomForm` e `InputForm`
- Gestión de errores visuales en los inputs
- Diseño modular y reutilizable

## 🚀 Instalación y Configuración
### 1️⃣ Clonar el repositorio
```bash
  git clone https://github.com/tu-repo.git
  cd tu-repo
```

### 2️⃣ Instalar dependencias
```bash
npm install
# O usando Bun
bun install
```

### 3️⃣ Ejecutar el proyecto
```bash
npm run dev
```

## 📁 Estructura del Proyecto
```
📂 src/
 ├── 📂 assets/
 ├── 📂 components/
 │   ├── 📂 CustomForm/
 │   │   ├── 📂 components/
 │   │   │   ├── CustomInput.css
 │   │   │   ├── CustomInput.tsx
 │   │   │   ├── index.ts
 │   │   ├── 📂 models/
 │   │   │   ├── Form.model.ts
 │   │   │   ├── index.ts
 │   │   ├── CustomForm.tsx
 ├── App.css
 ├── App.tsx
 ├── index.css
 ├── main.tsx
 ├── vite-env.d.ts
 ├── .gitignore
 ├── bun.lock
 ├── eslint.config.js
 ├── index.html
 ├── package.json
 ├── README.md
 ├── tsconfig.app.json
 ├── tsconfig.json
 ├── tsconfig.node.json
 ├── vite.config.ts
```

## 📜 Descripción del Código

### **1️⃣ `App.tsx`**
Punto de entrada de la aplicación. Renderiza el `CustomForm`.
```tsx
import './App.css'
import { CustomForm } from './components/CustomForm/CustomForm';

function App() {
  return (
    <>
     <CustomForm />
    </>
  )
}
export default App;
```

### **2️⃣ `CustomForm.tsx`**
Componente principal del formulario. Utiliza `react-hook-form` y `zod` para la validación.
```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "./components/CustomInput";
import { FormValues, schema } from "./models";

export const CustomForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm name="name" control={control} label="Name" type="text" error={errors.name} />
            <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
            <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />
            <InputForm name="confirmPassword" control={control} label="Confirm Password" type="password" error={errors.confirmPassword} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

### **3️⃣ `CustomInput.tsx`**
Componente reutilizable para los inputs.
```tsx
import { Control, Controller, FieldError } from "react-hook-form";
import "./CustomInput.css";
import { FormValues } from "../models";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            placeholder={label}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        )}
      />
      {error && (
        <div className="error-container">
          <div className="error">
            <p>{error.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;
```

### **4️⃣ `models.ts`**
Definición del esquema de validación con `zod`.
```ts
import { z } from "zod";

export const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Passwords must match"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export type FormValues = z.infer<typeof schema>;
```

## 📌 Tecnologías Utilizadas
- ⚛️ **React**
- 🎣 **React Hook Form**
- 📏 **Zod** (para validaciones)
- 💅 **CSS** para los estilos

## 🛠 Posibles Mejoras
- ✅ Agregar validaciones más avanzadas
- ✅ Mejorar la experiencia del usuario con `yup` o `zod`
- ✅ Implementar estilos con `styled-components` o `Tailwind`

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**. ¡Siéntete libre de usarlo y mejorarlo! 🚀

