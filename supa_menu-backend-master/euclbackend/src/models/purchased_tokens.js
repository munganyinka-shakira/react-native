const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    name: { type: String, default: null },
    category: { type: String, default: null },
    representative: { type: String, default: null },
    address: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    bankAccount: { type: String, default: null },
    sales: { type: Number, default: 0 },
},
{
    timestamps: true,
});

module.exports = model('Client', ClientSchema);
