
# Task Management System
Task management system is an application to create, read, update and delete tasks for users and the application will send 
reminders to the user prior to the events via email and sms. Database used is MySQL .Implemented using sequelize npm module.
Twillio sms service is used to send sms.

## Expected API CALLS


### User API s

#### Register user
- This API call is to create/signup users.
- End point : /users/signup 
- Request type : POST


#### User login
- This API call is to login users.
- End point : /users/login 
- Request type : POST


#### User logout
- This API call is to logout users.
- End point : /users/logout 
- Request type : GET


#### User create task
- This API call is to create a task and set reminder.
- End point : /users/task 
- Request type : POST

#### User create subtask
- This API call is to create a task and set reminder.
- End point : /users/subtask 
- Request type : POST

#### User update task
- This API call is to update tasks.
- End point : /users/taskUpdate 
- Request type : PUT

#### User update subtask
- This API call is to update tasks.
- End point : /users/subtaskUpdate 
- Request type : PUT

#### User delete task
- This API call is to delete tasks.
- End point : /users/taskdelete /:id
- Request type : Delete

#### User delete subtask
- This API call is to delete subtasks.
- End point : /users/subtaskdelete/:id&:taskid
- Request type : Delete

#### User read tasks
- This API call is to read tasks
- End point : /users/getAll 
- Request type : GET

#### User verify email
- This API call is to verify email.
- End point : /users/emailVerify 
- Request type : POST

#### User mobile verify
- This  API call is to verify phone number.
- End point : /users/mobileVerify 
- Request type : POST

  


### Admin API s


#### Admin login
- This API call is to admin login.
- End point : /admin/login 
- Request type : POST

#### Admin getAll user data
- This API call is to read users data.
- End point : /admin/getAllTask 
- Request type : GET

#### Admin logout
- This API call is to logout admin.
- End point : /admin/logout 
- Request type : GET

