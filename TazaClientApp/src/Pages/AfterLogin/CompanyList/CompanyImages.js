import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { instance } from '../../../Api/ApiManager';
import { styles } from '../../../styles/Styles';

export const CompanyImages = (props) => {
    const pp = props.props
    const [imageData, setImageData] = useState(null);
    useEffect(() => {
        console.log(pp)
        instance.get(`/public/file/photo/get/${pp}`, { responseType: 'blob' }).then((response) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
            };
            reader.readAsDataURL(response.data);

        }).catch(err => console.error(err))
    }, [])

    return (
        <View>

            {
                imageData ?
                <Image source={{ uri: imageData }} style={styles.image_company} />
                :
                <Image style={styles.image_company} source={require('../../../Assets/images/newimg.png')} />
            }
        </View>
    )
}
