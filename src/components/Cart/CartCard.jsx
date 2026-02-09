import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Rating, Badge } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import CardCheckout from "../Payments/CardCheckout";
import axios from "axios";
const theme = createTheme({
    palette: {
        custom: {
            main: "#ff6f00",   // primary orange
            light: "#ff8f00",  // lighter shade
            dark: "#ffa000",   // darker shade
            contrastText: "#fff" // text color on button
        },
    },
});


function CartCard({ data,onDelete}) {
    const { product } = data;
    const [quantity, setQuantity] = useState(data.quantity);
    console.log(data)
    return (
        <ThemeProvider theme={theme} color="secondary">
            <div className="main-container">
                <Row className="p-2">
                    <Col>
                        <Card className="p-3">

                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                <s className="fs-4">{product.old_price}</s>{" "}
                                <span className="fs-2 fw-bold">{product.selling_price}</span>
                            </Card.Text>
                            <Card.Text className="d-flex">
                                <Rating value={product.rating} readOnly />{" "}
                                <span className="mx-2">({product.rating_count})</span>
                            </Card.Text>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text className="fs-5">
                                {product.in_stock ? (
                                    <span className="text-success">In Stock</span>
                                ) : (
                                    <span className="text-danger">Out Of Stock</span>
                                )}
                            </Card.Text>
                            <Card.Text className="d-flex justify-content-between justify-content-lg-start align-items-center">
                                <span className="lead fs-3 me-2">Qnantity</span>
                                <ButtonGroup style={{ width: "150px" }}>
                                    <Button
                                        onClick={() =>
                                            setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                                        }
                                    >-</Button>
                                    <TextField
                                        variant="outlined"
                                        name="quantity"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            if (val >= 1) setQuantity(val);
                                        }}
                                        inputProps={{ style: { textAlign: "center" } }}
                                    />
                                    <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
                                </ButtonGroup>
                                <Button onClick={() => onDelete(data.id)} color="error" className="p-3 mx-2" variant="contained"><DeleteOutlineOutlinedIcon /></Button>
                            </Card.Text>
                            {/* Buy Now button with custom theme color */}
                            <Button variant="contained" className="my-3" color="custom">
                                Buy Now
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </ThemeProvider>
    );
}

export default CartCard;