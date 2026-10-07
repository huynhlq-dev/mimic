import { Link } from "react-router-dom";
import { invitations } from "../registry";

// Parent page: lists every invitation found in src/invitations/.
export default function Home() {
  return (
    <main className="page home">
      <h1>Thiệp mời</h1>
      <ul>
        {invitations.map((i) => (
          <li key={i.slug}>
            <Link to={`/${i.slug}`}>
              <strong>{i.meta.title}</strong>
              {i.meta.description && <span>{i.meta.description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
