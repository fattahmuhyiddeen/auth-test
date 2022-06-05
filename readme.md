### Development
1. Sequelize is setup following this tutorial https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp
1. If sequelize is not installed, globally, can use `npx sequelize-cli <command>`

## Requirement
1. NodeJS

### Database sequlize thingy
1. fresh migrate

```bash
npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
```

### to run the app
`npm install`

`npx nodemon`


### connect to ec2
chmod 400 keyValue.pem
<!-- ssh -i "~/licin.pem" ec2-user@ec2-3-92-213-39.compute-1.amazonaws.com -o "StrictHostKeyChecking no" -->
ssh -i "~/licin.pem" ubuntu@ec2-50-16-79-72.compute-1.amazonaws.com -o "StrictHostKeyChecking no"
