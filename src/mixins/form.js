import error from '@/mixins/error';
import loading from '@/mixins/loading';
import Inputt from '@c/inputt';

export default {
  mixins: [ error, loading ],
  components: { Inputt }
}
