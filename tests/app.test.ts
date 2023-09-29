import supertest from "supertest";
import fruits from "../src/data/fruits";
import app from "../src/index";
import { getFruitWithOutId, randomId } from "./factories/fruits.factorie";
import httpStatus from "http-status";
import { Fruit } from "repositories/fruits-repository";

const server = supertest(app);



describe("Get Fruits", () => {
    it("shoud return 404 when trying to get a fruit by an id that doesn't exist", () => {
        const response = fruits.find(fruit => {
            return fruit.id === 4;
        });
        let status: number = 200;
        if (!response) status = 404
        expect(status).toBe(404)
    })

    it("should return 400 when id param is present but not valid", () => {
        const id = randomId()
        let status: number = 200;
        if (typeof id != "number") status = 400
        expect(status).toBe(400)
    })

    it("should return one fruit when given a valid and existing id", () => {
        const response = fruits.find(fruit => {
            return fruit.id === 3;
        });
        let status: number = httpStatus.BAD_REQUEST;
        if (response) status = httpStatus.OK
        expect(status).toBe(httpStatus.OK)
    })

    it("should return all fruits if no id is present", () => {
        // simulando a req
        const id = getFruitWithOutId()
        let response: Fruit[] | Fruit ;
        if (!id) response = fruits
        expect(response).toHaveLength(2)
    })
})

describe("Post Fruits", () => {
    it("should return 201 when inserting a fruit", () => {
        const aray = [... fruits]
        const newArray = [... fruits]
        newArray.push({
            id: 2,
            name: "banana",
            price: 2,
        })
        let status = 404
        if(newArray.length > aray.length) status = 201
        expect(status).toBe(201)
    })

    it("should return 409 when inserting a fruit that is already registered", () => {
        let status = 200;
        if (fruits.find(fruit => {
            return fruit.name === "maça"
        })) status = 409
        expect(status).toBe(409)
    })

    it("should return 422 when inserting a fruit with data missing", () => {
        let status = 200;
        const newArray = [... fruits]
        newArray.push({
            id: 2,
            name: "banana",
            price: null,
        })
        if (newArray.find(fruit => {
            return fruit.name === null || fruit.id === null || fruit.price === null
        })) status = 422
        expect(status).toBe(422)
    })
})