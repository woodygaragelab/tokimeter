import React from 'react'
import Loader from 'react-loader-spinner'
// TextAnalizerコンポネント
export const TextAnalizer = () => {

    return (
        <div>
            <div className="kzGraph">
                <p></p>
            </div>

            {/* テキスト解析のアニメーション。後でテキスト解析画面に置き換える */}
            <div className="mt-4">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={10000} // msec
                />
            </div>
        </div>


    );

}

export default TextAnalizer