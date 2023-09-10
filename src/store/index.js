import light from './modules/light';
import musicPlay from './modules/musicPlay';
import music from './modules/music';

export default function useStore(){
    return {
        light:light(),
        musicPlay:musicPlay(),
        music:music(),
    }
}