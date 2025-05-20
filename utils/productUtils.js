const productSelectionSQL = `
  SELECT
    p.id, p.name, p.price, p.description, p.stockquantity,
    b.id AS brand_id, b.name AS brand_name,
    c.id AS category_id, c.name AS category_name
  FROM product p
  JOIN brand b ON p.brandid = b.id
  JOIN category c ON p.categoryid = c.id
`

function mapProductRow(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    description: row.description,
    stockquantity: Number(row.stockquantity),
    brand: {
      id: Number(row.brand_id),
      name: row.brand_name,
    },
    category: {
      id: Number(row.category_id),
      name: row.category_name,
    },
  }
}

module.exports = { productSelectionSQL, mapProductRow }
