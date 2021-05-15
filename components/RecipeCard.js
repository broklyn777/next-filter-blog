import Link from 'next/link'
import Image from 'next/image'

export default function RecipeCard({ recipe }) {
  const { title, slug, cookingTime, thumbnail } = recipe.fields
console.log(recipe );
  return (
    <div className="card">
      <div className="featured">
        <Image 
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{ title }</h4>
          <p>Detta tar ca {cookingTime } min att laga</p>
        </div>
        <div className="actions">
          <Link href={'/recipes/' + slug}><a>Visa recept</a></Link>
        </div>
      </div>

      <style jsx>{`
        .card {
          // transform: rotateZ(-1deg);
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: -40px;
          // left: -10px;
        }
        .info {
          padding: 1px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: -20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: #0ea5e9;
          padding: 8px 12px;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}
