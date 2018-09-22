import Trait from '@/assets/js/Trait';
import error from './error';
import loading from './loading';
import Inputt from '@/components/inputt';

export default new Trait()
  .use(error, loading)
  .with('inputt');
