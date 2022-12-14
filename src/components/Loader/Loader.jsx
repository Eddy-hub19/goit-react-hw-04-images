// Описание компонента <Loader>
// Компонент спинера, отображется пока идет загрузка изобаржений. Используй любой готовый компонент, например react-loader-spinner или любой другой.

import { FallingLines } from 'react-loader-spinner';

<FallingLines
  color="#198173"
  fill="#198173"
  width="100"
  visible={true}
  ariaLabel="falling-lines-loading"
/>;

export default FallingLines;
