# TrueSizeCalculation

## Setup

### Prepare Database

- Create a Postgres database
- import [SQL](truefit.pgsql) file

### NPM Install

- move to project directory
- run `npm install`
- on a terminal type `npm run start` and hit enter to run the service or
- type `npm run start:dev` and hit to run dev mode

## Usage

### GET

- Go to `http://localhost:3000/` to access the root page
- Go to `http://localhost:3000/true-size/` to access TrueToSizeCalculation for all shoes
- Go to `http://localhost:3000/true-size/shoe_id` (replace `shoe_id` with `1, 2 .. etc. values`) to access TrueToSizeCalculation for a specific shoe.
    - example: `http://localhost:3000/true-size/2`
    - Request takes only shoe id, shoe name is supported yet
    - @TO-DO: enable the service to take shoe name

### POST

- On a terminal type `curl --data "shoe_id=$i&value=$v" http://localhost:3000/true-size`
    - replace `$i` and `$v` with shoe id and true-to-size data
- should return status and last insert id
- @TO-DO: implement standard NodeJS validation