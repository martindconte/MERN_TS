//* FOLDER --> DTOs

//* Catalog --> dtos/catalog
/* signal --> dtos/catalog/signal */
export * from './catalog/board/create-board.dto';
export * from './catalog/board/search-board.dto';
export * from './catalog/board/update-board.dto';

/* signal --> dtos/catalog/signal */
export * from './catalog/signal/create-signal.dto';
export * from './catalog/signal/update-signal.dto';

/* subrack --> dtos/catalog/subrack */
export * from './catalog/subrack/create-subrack.dto';
export * from './catalog/subrack/search-subracks.dto';
export * from './catalog/subrack/update-subrack.dto';

/* transceiver --> dtos/catalog/transceiver */
export * from './catalog/transceiver/create-transceiver.dto';
export * from './catalog/transceiver/search-transceiver.dto';
export * from './catalog/transceiver/update-transceiver.dto';

/* vendor --> dtos/catalog/vendor */
export * from './catalog/vendor/create-vendor.dto';
export * from './catalog/vendor/queries-vendor-.dto';
export * from './catalog/vendor/update-vendor.dto';

//* Central --> dtos/central
export * from './central/create-central.dto';
export * from './central/search-central.dto';
export * from './central/update-central.dto';

//* Network Element --> dtos/network-element
export * from './network-element/create-networkElement.dto';

//* Shared
export * from './shared/queries.dto';