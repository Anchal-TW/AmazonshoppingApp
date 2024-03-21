import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface StarRatingProps {
  rating: number;
  starSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({rating, starSize = 20}) => {
  const renderStars = () => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = totalStars - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../assets/fullStar.png')}
          style={{width: starSize, height: starSize}}
        />,
      );
    }

    if (halfStars === 1) {
      stars.push(
        <Image
          key={stars.length}
          source={require('../assets/halfStar.png')}
          style={{width: starSize, height: starSize}}
        />,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Image
          key={stars.length}
          source={require('../assets/emptyStar.png')}
          style={{width: starSize, height: starSize}}
        />,
      );
    }

    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StarRating;
