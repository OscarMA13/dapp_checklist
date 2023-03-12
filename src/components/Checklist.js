import { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import { ethers } from "ethers";
import ChecklistContract from "./contracts/Checklist.json";

const Checklist = ({ signer }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = async () => {
    const contract = new ethers.Contract(
      ChecklistContract.networks.hardhat.address,
      ChecklistContract.abi,
      signer
    );

    await contract.addItem(newItem);

    setNewItem("");
    await refreshItems();
  };

  const toggleCompleted = async (index) => {
    const contract = new ethers.Contract(
      ChecklistContract.networks.hardhat.address,
      ChecklistContract.abi,
      signer
    );

    await contract.toggleCompleted(index);

    await refreshItems();
  };

  const refreshItems = async () => {
    const contract = new ethers.Contract(
      ChecklistContract.networks.hardhat.address,
      ChecklistContract.abi,
      signer
    );

    const count = await contract.items.length;

    let items = [];
    for (let i = 0; i < count; i++) {
      const item = await contract.items(i);
      items.push({ name: item.name, completed: item.completed });
    }

    setItems(items);
  };

  useEffect(() => {
    refreshItems();
  }, []);

  return (
    <Container className="my-5">
      <h1>Checklist</h1>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={addItem}>
          Add Item
        </Button>
      </Form>
      <ListGroup className="mt-3">
        {items.map((item, index) => (
          <ListGroup.Item
            key={index}
            className={item.completed ? "text-muted" : ""}
            onClick={() => toggleCompleted(index)}
          >
            {item.completed ? <del>{item.name}</del> : item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Checklist;
