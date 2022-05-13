"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const sessions_route_1 = __importDefault(require("./routes/sessions.route"));
const status_route_1 = __importDefault(require("./routes/status.route"));
const MongoConnection_1 = __importDefault(require("./database/MongoConnection"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const siteAutorization_1 = __importDefault(require("./middleware/siteAutorization"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'https://rk-prime.vercel.app',
}));
MongoConnection_1.default.connect();
app.use(status_route_1.default);
app.use(siteAutorization_1.default);
app.use(express_1.default.static(path_1.default.resolve(__dirname + '/public')));
app.use(sessions_route_1.default);
app.use(products_route_1.default);
app.use(users_route_1.default);
app.listen(port, (() => {
    console.log(`aplicação online na porta: ${port}`);
}));
