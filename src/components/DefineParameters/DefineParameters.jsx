import defs from "../../data/paramDefs"
import "./DefineParameters.scss"

const DefineParameters = () => {
  return (
    <div className="defineParams">
      {defs.map((def, i) => (
        <div className="defineParams__item" key={i}>
          <p>
            <b>{def.name}:</b> {def.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default DefineParameters
