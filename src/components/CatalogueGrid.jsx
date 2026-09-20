const CatalogueGrid = ({ instruments, type }) => (
  <section className="catalogue-list" aria-labelledby="catalogue-list-title">
    <div className="catalogue-list__heading">
      <span>Indexable product categories</span>
      <h2 id="catalogue-list-title">Browse Our {type} Range</h2>
      <p>
        Each category can be produced for export orders and discussed as part
        of an OEM or private-label programme.
      </p>
    </div>

    <div className="catalogue-list__grid">
      {instruments.map((instrument) => (
        <article className="catalogue-item" key={instrument.name}>
          <div className="catalogue-item__image-wrap">
            <img
              src={instrument.image}
              alt={`${instrument.name} manufactured by Seamoon Industries`}
              loading="lazy"
              className="catalogue-item__image"
            />
          </div>
          <div className="catalogue-item__copy">
            <h2>{instrument.name}</h2>
            <p>{instrument.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default CatalogueGrid;
