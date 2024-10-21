# integracion supabase

## Schemas en Supabase
### crear schema

### crear tablas en el schema

### crear politicas de acceso
- crear politica con ayuda del asistente indicando:
    - el schema para la tabla: myschema.mytable
    - los roles: public, anon

### exponer schema: permisos (reemplazar myschema por el nombre del schema)
```sql
GRANT USAGE ON SCHEMA myschema TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA myschema TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA myschema TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA myschema TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA myschema GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA myschema GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA myschema GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
```

```sql
GRANT USAGE ON SCHEMA myschema TO myrole;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA myschema TO myrole;
```

### exponer schema en settings -> api -> Data Api Settings
- agregar el schema

### En el proyecto, crear el cliente indicando el schema a utilizar
```js   
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    db: {
      schema: "myschema",
    },
  }
);
```
