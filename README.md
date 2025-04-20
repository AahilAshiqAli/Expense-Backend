to run this project.
Simply install pnpm using 
npm install -g pnpm@latest-10

then do pnpm install.
Make sure you have closed all applications using that project's directory

Then, to run the project,
pnpm start:dev

This project, i think, is based on CommonJS

Commitlintr.json:
This file is used to enforce commit message conventions

.eslintrc.cjs:
This file enforces lint rules for projects which have type="commonJS" in
package.json
has type-script eslint which enforces typescript specific liting rules.

If you have extension eslint downloaded then no need to run linting on command line.
Automatically IDE will run linting.

.lintstagedrc:
Will check linting in all files staged for commit.
Will only check, not fix those errors:
If you want to fix those erroes then eslint --fix.
I think it works with husky in git work

.prettierc:
if you encounter prettier --write, it means automically correct formatting errors.

combined.log:
All the log messages you can possibly display.

error.log:
All the error message syou can display in log

tsconfig.json:
configuration of typescript compilation.
Tells we are using ES2022 language level.

index.ts:
server starts at index.ts

We are implementing Repository pattern:
Routes => Middleware => Controller => Services => Repository => Model

In between we use DTOs => Data Transfer Object which defines the type of req and res.
DTO ensures that only specific fields are exposed. SO even if we have alot of data going out, by defining DTO, we can specify to send selective data.

Controller is just for taking in requests and giving responses and handling all error

Services is to implement core backend logic. Always good to implement in classes

Repository handles all interaction with DB. Always good to implement it in classes

Environment Variables:
If you want to add any environment variables, then add in schema
@/lib/env/schema.ts
and in .env file

env.ts:
validates that env variables in .env match the schema defined in schema.ts

JWT authentication:

make-authentication.ts:
As done in insurance CRM backend,
middleware function has 3 params (req, res, next)
we extract the token from request.
Then validate the token => done in jwt-authentication.ts
Then call next function.

jwt-authentication.ts:
This validates that the token recieved is correct.
Uses user.repository to find if parsed token is an id present in the DB
crete token funtion does sign / issues the token on request.
More info can be found in that file

why does sindex.ts exists in all lib folders:
By exporting all files in that folder forexample in authentication, we expoerted both other files
from index.ts. Now in other files we can call like this...
import { makeAuthenticate, JwtAuthentication } from './lib/authentication';


types.ts:
All types in that folder are written in types file

database.ts:
connect to database as we made in config/database.js in insurance crm backend

entity-repository.ts:
This is the base class which is extended in all the other repository classes like user.repository.ts
When building a repository, we need to extend this class and we can add custom methods to it. Now in services, when we create object of respository, we can call custom methods defined in repository or call basic generic methods like findOne, findByID and exists( returns boolean) from entity repository class. 
To create a proper ORM, we can use TypeORM. Future research needed

make-Handler.ts:
exports make-Handler function used in auth.controller.
Has functions which check data for each way data can come in 
req.(query, params, body)
Now, when you are using it in controller,
when defining your schema like this:
const searchSchema = {
  query: z.object({
    keyword: z.string().min(3),
    limit: z.number().int().min(1).max(100),
  }),
};
z is basically Zod. DTOs are basically zod objects
if this schema is passed to function then function knows it needs to check query for data.
For more info , check auth.controller.ts

server-event-emitter:
This file is used to listen to events and trigger respose based on that.
 user signup triggers welcome email in a separate module
 So listen for user sign up and then response is sending email

exceptions folder:
?
?
?
?


Why do we have auth and user modules seperately?
auth folder = Authentication logic
Contains everything related to logging in and signing up:

login.dto.ts, register.dto.ts: Validate login/signup data.

auth.controller.ts: Handles /login, /register routes.

auth.service.ts: Auth logic like password comparison, JWT issuing, etc.

auth.router.ts: Defines routes like /auth/login.

🧠 Key idea: Auth is about verifying identity and issuing tokens.

✅ user folder = User management
Handles all user-related CRUD and internal business logic:

user.controller.ts: Deals with routes like /users/:id, /users/me.

user.service.ts: Logic like updating profile, finding users.

user.repository.ts: DB operations via Mongoose.

user.entity.ts: Mongoose schema for users.

🧠 Key idea: The user module is for working with user data, not logging in or signing up.



How to get current use rinfo in expense module?
Since, here we dont have session concept so every time request comes we try to check that it is a valid user.
In validate function, we check that user is valid and then we return user info into req.user.
Now to get user info in expense module, we just need to import req.user.

Status codes handling should be done in make-handler.ts or controller.ts??
It should be done in controller.ts because each functionality needs to return different error status codes nothing generic so it should be done in controller.ts



















