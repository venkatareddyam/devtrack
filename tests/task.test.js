const request = require("supertest");
const app = require("../src/app");

describe("DevTrack API", () => {
  let taskId;

  test("GET /api/health should return API status", async () => {
    const response = await request(app)
      .get("/api/health")
      .expect(200);

    expect(response.body).toEqual({
      status: "ok",
      service: "devtrack-api"
    });
  });

  test("POST /api/tasks should create a task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        title: "Prepare deployment",
        description: "Create Kubernetes deployment",
        priority: "high"
      })
      .expect(201);

    taskId = response.body.id;

    expect(response.body).toMatchObject({
      title: "Prepare deployment",
      description: "Create Kubernetes deployment",
      priority: "high",
      status: "pending"
    });

    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });

  test("POST /api/tasks should reject an empty title", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        title: ""
      })
      .expect(400);

    expect(response.body).toEqual({
      error: "Task title is required"
    });
  });

  test("GET /api/tasks should return tasks", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /api/tasks/:id should return a task", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .expect(200);

    expect(response.body.id).toBe(taskId);
    expect(response.body.title).toBe("Prepare deployment");
  });

  test("PUT /api/tasks/:id should update a task", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        status: "in-progress",
        priority: "medium"
      })
      .expect(200);

    expect(response.body.id).toBe(taskId);
    expect(response.body.status).toBe("in-progress");
    expect(response.body.priority).toBe("medium");
  });

  test("DELETE /api/tasks/:id should delete a task", async () => {
    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .expect(204);

    await request(app)
      .get(`/api/tasks/${taskId}`)
      .expect(404);
  });

  test("GET /api/tasks/:id should return 404 for an unknown task", async () => {
    await request(app)
      .get("/api/tasks/00000000-0000-0000-0000-000000000000")
      .expect(404);
  });
});
