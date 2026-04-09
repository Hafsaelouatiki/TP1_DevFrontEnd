import { useState, type FormEvent } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';

export default function LoginBS() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setError('');
    console.log({ email, password });
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <Card.Body>
          <Card.Title
            className="text-center"
            style={{ color: '#1B8C3E' }}
          >
            TaskFlow
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Se connecter
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}