# Dynamic Portfolio Application

A fully responsive, containerized, and highly customizable personal portfolio website. This application dynamically generates your entire portfolio and a beautifully styled PDF resume from a single `info.yaml` configuration file.

## ✨ Features

- **No-Code Updates**: Simply edit `info.yaml` to update your entire website. No HTML, CSS, or JavaScript editing required.
- **One-Click PDF Resume**: Automatically generates a downloadable PDF version of your resume on-the-fly using `WeasyPrint` and `Jinja2`.
- **Premium Design**: Beautiful light pastel mode with vibrant violet accents, micro-animations, and hover effects built with Vanilla CSS.
- **Containerized**: Fully orchestrated with Docker Compose, ensuring the application runs consistently across all environments.

## 🛠️ Technology Stack

- **Backend**: Python, FastAPI, Poetry
- **Frontend**: TypeScript, React, Vite
- **Proxy**: Nginx
- **PDF Generation**: WeasyPrint, Jinja2
- **Deployment**: Docker & Docker Compose

## 🚀 How to Run

Make sure you have **Docker Desktop** (or Docker Engine + Docker Compose) installed and running on your machine.

1. **Clone the repository** (or navigate to your project directory):
   ```bash
   cd path/to/portfolio
   ```

2. **Build and start the application**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - The Website: [http://localhost](http://localhost)
   - The API (Raw JSON data): [http://localhost/api/portfolio](http://localhost/api/portfolio)

## 📝 Customizing Your Information

To update your portfolio, open the `info.yaml` file located in the root of the project.

You can freely update your:
- Basic information (`name`, `title`, `about`)
- Contact links
- `soft_skills` & `hard_skills`
- `pet_projects` (and add links)
- `work_experience`
- `education`

*Note: The website pulls this data dynamically from the API, so after saving changes to `info.yaml`, simply refresh your web browser to see the updates!*

## 🎨 Changing the Design

If you wish to dive into the code and tweak the design:
- **Website Styling**: Edit `frontend/src/index.css` and `frontend/src/App.css`.
- **PDF Template**: Edit the Jinja2 HTML layout inside `backend/templates/resume.html`.

## 🛑 Stopping the Server
To safely stop the containers, run:
```bash
docker-compose down
```
